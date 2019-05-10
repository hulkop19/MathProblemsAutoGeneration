﻿using System;
using System.Collections.Generic;

namespace MathProblemGeneratorServer
{
    class FiveDivProblem : Problem
    {
        int _maxDeg;
        int _minDeg;
        int _remNum1;
        int _remNum2;
        int _minBase;
        int _maxBase;
        int _divider;
        static ushort _seed = 0;

        public FiveDivProblem(string param)
        {
            var data = param.Split(',');

            _minDeg = int.Parse(data[0]);
            _maxDeg = int.Parse(data[1]);
            _remNum1 = int.Parse(data[2]);
            _remNum2 = int.Parse(data[3]);
            _minBase = int.Parse(data[4]);
            _maxBase = int.Parse(data[5]);
            _divider = int.Parse(data[6]);

            for (int i = 0; i <= 10; ++i)
            {
                Console.WriteLine($"{i}:  {GetNumberOfReminds(i)}");
            }
        }

        public string Generate()
        {
            return Format(GetGeneratorResult());
        }

        private int GetNumberOfReminds(int num)
        {
            int numOfRem = 0;
            int nowRem = num;
            int i = 1;

            while (i <= 10)
            {
                nowRem *= num;
                nowRem %= _divider;
                ++numOfRem;

                if (nowRem == (num % _divider))
                {
                    break;
                }

                ++i;
            }

            return numOfRem;
        }

        private List<int> GetGeneratorResult()
        {
            List<int> result = new List<int>();  // [num1, num2, degree]
            _seed = (ushort)((_seed + 1) % ushort.MaxValue);
            Console.WriteLine($"seed: {_seed}");
            var random = new Random(_seed);

            int num = random.Next(_minBase, _maxBase);

            while (result.Count < 2)
            {
                if (result.Count == 0 && GetNumberOfReminds(num) == _remNum1)
                {
                    result.Add(num);
                }
                else if (result.Count == 1 && GetNumberOfReminds(num) == _remNum2 && result[0] != num)
                {
                    result.Add(num);
                }

                num = random.Next(_minBase, _maxBase);
            }

            int deg = random.Next(_minDeg, _maxDeg);
            result.Add(deg);

            return result;
        }

        private string Format(List<int> resultOfGenerator)
        {
            int num1 = resultOfGenerator[0];
            int num2 = resultOfGenerator[1];
            int deg = resultOfGenerator[2];

            return $"({num1}^{deg} * {num1}{num1}^{deg} * {num1}{num1}{num1}^{deg}) + " +
                   $"({num2}^{deg} * {num2}{num2}^{deg} * {num2}{num2}{num2}^{deg})";
        }
    }
}
