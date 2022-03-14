using System.Collections.Generic;

namespace FusionWebDev_ToDoApp
{
    internal class ToDoCache
    {
        private static readonly ToDoItem[] defaultToDos = { new ToDoItem("make pudding"),
                                                            new ToDoItem("walk dog"),
                                                            new ToDoItem("yoga"),
                                                            new ToDoItem("call dentist")};
        public static List<ToDoItem> ToDoList = new List<ToDoItem>(defaultToDos);
    }
}