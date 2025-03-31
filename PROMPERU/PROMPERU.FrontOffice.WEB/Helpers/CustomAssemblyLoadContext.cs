using System;
using System.Runtime.InteropServices;
using System.Reflection;
using System.IO;
using System.Runtime.Loader;

namespace PROMPERU.FrontOffice.WEB.Helpers
{   

    public class CustomAssemblyLoadContext : AssemblyLoadContext
    {
        public CustomAssemblyLoadContext() : base(isCollectible: true) { }

        public IntPtr LoadUnmanagedLibrary(string absolutePath)
        {
            return LoadUnmanagedDll(absolutePath);
        }

        protected override IntPtr LoadUnmanagedDll(string unmanagedDllPath)
        {
            return NativeLibrary.Load(unmanagedDllPath);
        }

        protected override Assembly Load(AssemblyName assemblyName)
        {
            return null;
        }
    }

}
