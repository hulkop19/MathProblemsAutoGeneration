using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathProblemGeneratorServer
{
    class Work
    {
        public int Id { get; }
        public string Name { get; }
        public int NumberOfVariants { get; }
        public List<List<string>> Variants {get;}

        [JsonConstructor]
        public Work(int id, string name, int numberOfVariants)
        {
            Console.WriteLine("Work(int id, string name, int numberOfVariants)");
            Id = id;
            Name = name;
            NumberOfVariants = numberOfVariants;

            Variants = new List<List<string>>();
        }

        public Work(string name, int numberOfVariants)
        {
            Console.WriteLine("Work(string name, int numberOfVariants)");
            using (var reader = new StreamReader(@"./Data/lastWorkId.json"))
            {
                Id = JsonConvert.DeserializeObject<int>(reader.ReadToEnd()) + 1;
            }

            File.Create(@"./Data/lastWorkId.json").Close();

            using (var writer = new StreamWriter(@"./Data/lastWorkId.json"))
            {
                writer.WriteLine(JsonConvert.SerializeObject(Id));
            }

            Name = name;
            NumberOfVariants = numberOfVariants;

            Variants = new List<List<string>>();
            
            for (int i = 0; i < numberOfVariants; ++i)
            {
                Variants.Add(new List<string>());
            }
        }

        public void AddProblem(Problem problem)
        {
            foreach (var variant in Variants)
            {
                variant.Add(problem.Generate());
            }
        }

        public string CreatePdf()
        {
            var output = "./Output.pdf";
            var bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1250, BaseFont.NOT_EMBEDDED);
            using (FileStream fs = new FileStream(output, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                using (Document doc = new Document(PageSize.A4, 2, 2, 10, 10))
                {
                    PdfContentByte _pcb;
                    using (PdfWriter writer = PdfWriter.GetInstance(doc, fs))
                    {
                        doc.Open();

                        for (int i = 0; i < Variants.Count; ++i) {
                            doc.NewPage();
                            _pcb = writer.DirectContent;
                            _pcb.SetFontAndSize(bf, 12);
                            _pcb.BeginText();
                            _pcb.ShowTextAligned(PdfContentByte.ALIGN_LEFT, $"Variant: {i + 1}", 270, 800, 0);

                            for (int j = 0; j < Variants[i].Count; ++j)
                            {
                                _pcb.ShowTextAligned(PdfContentByte.ALIGN_LEFT, $"{j + 1}) {Variants[i][j]}", 50, 800 - (35 * (j + 1)), 0);
                            }
                            _pcb.EndText();
                        }

                        doc.Close();
                    }
                }
            }

            return "http://localhost:8080/Output.pdf";
        }
    }
}
