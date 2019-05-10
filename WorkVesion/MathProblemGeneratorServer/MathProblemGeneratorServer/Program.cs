using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathProblemGeneratorServer
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] prefixes = { "http://localhost:8080/" };

            while (true)
            {
                try
                {
                    HttpServer.SimpleListenerExample(prefixes);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }

            //var work = new Work("first", 8);
            //var problem = new FiveDivProblem("1,100,2,4,1,9,5");

            //work.AddProblem(problem);
            //work.AddProblem(problem);

            //work.CreatePdf();
        }
    }
}
