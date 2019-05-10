using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MathProblemGeneratorServer
{
    class HttpServer
    {
        public static void SimpleListenerExample(string[] prefixes)
        {
            if (!HttpListener.IsSupported)
            {
                Console.WriteLine("Windows XP SP2 or Server 2003 is required to use the HttpListener class.");
                return;
            }

            if (prefixes == null || prefixes.Length == 0)
                throw new ArgumentException("prefixes");

            HttpListener listener = new HttpListener();

            foreach (string s in prefixes)
            {
                listener.Prefixes.Add(s);
            }

            listener.Start();
            Console.WriteLine("Listening...");

            HttpListenerContext context = listener.GetContext();
            SendRequest(context);

            listener.Stop();
        }

        private static void SendRequest(HttpListenerContext context)
        {
            HttpListenerResponse response = context.Response;
            HttpListenerRequest request = context.Request;
            response.Headers.Add("Access-Control-Allow-Origin: *");
            string responseString = "";

            var path = context.Request.Url.LocalPath;
            if (context.Request.HttpMethod == "GET" && path.Length > 1)
            {
                path = path.Substring(1, path.Length - 1);
                using (var input = File.OpenRead(path))
                {
                    context.Response.ContentType = "application/octet-stream";
                    context.Response.ContentLength64 = input.Length;

                    byte[] buff = new byte[1024 * 32];
                    int nbytes;
                    while ((nbytes = input.Read(buff, 0, buff.Length)) > 0)
                        context.Response.OutputStream.Write(buff, 0, nbytes);
                }
                context.Response.OutputStream.Flush();
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                return;
            }
            else if (context.Request.HttpMethod == "POST")
            {
                string text = "";
                using (var reader = new StreamReader(request.InputStream,
                                         request.ContentEncoding))
                {
                    text = reader.ReadToEnd();
                }

                switch (text.Split()[0])
                {
                    case "add_work":
                        responseString = HttpRequestHandler.AddWork(text.Split()[1], int.Parse(text.Split()[2]));
                        break;
                    case "delete_work":
                        responseString = HttpRequestHandler.DeleteWork(int.Parse(text.Split()[1]));
                        break;
                    case "add_problem":
                        Console.WriteLine($"{text.Split()[2]}   {text.Split()[3]}");
                        responseString = HttpRequestHandler.AddProblem(int.Parse(text.Split()[1]), text.Split()[2], text.Split()[3]);
                        break;
                    case "get_problem_list":
                        responseString = HttpRequestHandler.GetProblemList();
                        break;
                    case "get_pdf":
                        context.Response.ContentType = "application/octet-stream";
                        responseString = HttpRequestHandler.GetPdf(int.Parse(text.Split()[1]));
                        responseString = "http://localhost:8080/Output.pdf";
                        break;
                }
            }
            else if (context.Request.HttpMethod == "GET")
            {
                responseString = HttpRequestHandler.GetWorks();
            }

            
            byte[] buffer = Encoding.UTF8.GetBytes(responseString);

            response.ContentLength64 = buffer.Length;
            Stream output = response.OutputStream;
            output.Write(buffer, 0, buffer.Length);

            output.Close();
        }
    }
}
