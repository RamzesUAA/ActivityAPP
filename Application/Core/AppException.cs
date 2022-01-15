using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int statisCode, string message, string details = null)
        {
            StatisCode = statisCode;
            Message = message;
            Details = details;
        }

        public int StatisCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}
