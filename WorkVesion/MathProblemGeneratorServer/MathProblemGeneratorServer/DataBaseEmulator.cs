using System.IO;

namespace MathProblemGeneratorServer
{
    static class DataBaseEmulator
    {
        public static string ReadData()
        {
            using (var reader = new StreamReader(@".\Data\worksData.json"))
            {
                return reader.ReadToEnd();
            }
        }

        public static void WriteData(string data)
        {
            File.Create(@".\Data\worksData.json").Close();

            using (var writer = new StreamWriter(@".\Data\worksData.json"))
            {
                writer.WriteLine(data);
            }
        }
    }
}
