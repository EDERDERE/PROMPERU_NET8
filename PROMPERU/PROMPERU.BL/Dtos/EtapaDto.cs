using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class EtapaDto
    {
        public int id { get; set; }
        public int paso { get; set; }
        public string nombreIcono { get; set; }             
        public string urIcono { get; set; }
        public bool? Current { get; set; }
    }   
}
