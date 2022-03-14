using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FusionWebDev_ToDoApp
{
	public class ToDoController : ApiController
	{
		private bool IsIdValid(int id)
        {
			return ((id >= 0) && (id < ToDoCache.ToDoList.Count));
		}

		// GET api/<controller>
		public IHttpActionResult Get()
		{
			return Ok(ToDoCache.ToDoList);
		}

		// GET api/<controller>/5
		public IHttpActionResult Get(int id)
		{
			if (IsIdValid(id))
			{
				return Ok(ToDoCache.ToDoList[id]);
			}
			else
            {
				return NotFound();
            }
		}

		// POST api/<controller>
		public IHttpActionResult Post([FromBody] string task)
		{
			ToDoCache.ToDoList.Add(new ToDoItem(task));
			return Ok();
		}

		// PUT api/<controller>/5
		public IHttpActionResult Put(int id, [FromBody] bool isChecked)
		{
			if (IsIdValid(id))
			{
				ToDoCache.ToDoList[id].SetItemCheckStatus(isChecked);
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		// DELETE api/<controller>/5
		public IHttpActionResult Delete(int id)
		{
			if (IsIdValid(id))
			{
				ToDoCache.ToDoList.RemoveAt(id);
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}
	}
}