using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathProblemGeneratorServer
{
    static class HttpRequestHandler
    {
        public static string GetWorks()
        {
            return DataBaseEmulator.ReadData();
        }

        public static string AddWork(string name, int numberOfVariants)
        {
            var works = JsonConvert.DeserializeObject<List<Work>>(DataBaseEmulator.ReadData());
            works.Add(new Work(name, numberOfVariants));
            var worksjson = JsonConvert.SerializeObject(works);
            DataBaseEmulator.WriteData(worksjson);

            return worksjson;
        }

        public static string DeleteWork(int id)
        {
            var works = JsonConvert.DeserializeObject<List<Work>>(DataBaseEmulator.ReadData());
            works.RemoveAll((work) => work.Id == (id));
            var worksjson = JsonConvert.SerializeObject(works);
            DataBaseEmulator.WriteData(worksjson);

            return worksjson;
        }

        public static string AddProblem(int workId, string problemName, string param)
        {
            var works = JsonConvert.DeserializeObject<List<Work>>(DataBaseEmulator.ReadData());

            foreach (var work in works)
            {
                if (work.Id == workId)
                {
                    switch (problemName)
                    {
                        case "fiveDivProblem":
                            work.AddProblem(new FiveDivProblem(param));
                            break;
                        case "euclideanAlgorithmProblem":
                            work.AddProblem(new EuclideanAlgorithmProblem(param));
                            break;
                    }
                }
            }
            var worksjson = JsonConvert.SerializeObject(works);
            DataBaseEmulator.WriteData(worksjson);

            return worksjson;
        }

        public static string GetPdf(int workId)
        {
            var works = JsonConvert.DeserializeObject<List<Work>>(DataBaseEmulator.ReadData());

            foreach (var work in works)
            {
                if (work.Id == workId)
                {
                    return work.CreatePdf();
                }
            }

            return "";
        }

        public static string GetProblemList()
        {
            using (var reader = new StreamReader(@".\Data\problemNames.json"))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
