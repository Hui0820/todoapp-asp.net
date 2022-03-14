namespace FusionWebDev_ToDoApp
{
    internal class ToDoItem
    {
        public string task { get; set; }
        public bool isChecked { get; set; }

        public ToDoItem(string task)
        {
            this.task = task;
            isChecked = false;
        }

        public void SetItemString(string task)
        {
            this.task = task;
        }
        public void SetItemCheckStatus(bool isChecked)
        {
            this.isChecked = isChecked;
        }
    }
}