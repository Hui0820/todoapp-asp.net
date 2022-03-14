$(document).ready(function () {
	const checklist = $("#checklist");
	const doneList = $("#done-list");

	// GET api call
	async function getList(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();

			// Clear both lists
			checklist.empty();
			doneList.empty();

			for (let i = 0; i < data.length; i++) {
				const listItem = createListItem(data[i].task, i, data[i].isChecked);
				const isChecked = data[i].isChecked;

				if (isChecked) {
					doneList.append(listItem);
				} else {
					checklist.append(listItem);					
				}
			}
			isCheckListEmpty();
			isDoneListEmpty();
		} catch (e) {
			console.log(e);
		}
	}

	// POST api call
	async function postData(url, data) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});			
		} catch (e) {
			console.log(e);
		}
	}

	// PUT api call
	async function updateData(url, data) {
//		console.log(url, data);
		try {
			await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
		} catch (e) {
			console.log(e);
		}
	}

	// DELETE api call
	async function removeData(url) {
		console.log(url);
		try {
			await fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (e) {
			console.log(e);
		}
	}

	// Create item list UI element
	function createListItem(item, id, isChecked) {
		const listContainer = $("<li>").addClass("checklist-item list-group-item d-flex align-items-center border-0 mb-2 rounded pl-3 mb-2");
		const checkbox = $("<input>").attr("type", "checkbox").attr("id", id).attr("checked", isChecked)
			.addClass("form-check-input ml-0").on("change", checkboxChange);
		let label = "";
		if (isChecked) {
			label = $("<label>").attr("for", id).addClass("mb-1 strikethrough").text(item);
		} else {
			label = $("<label>").attr("for", id).addClass("mb-1").text(item);
		}

		const removeIcon = $("<i>").addClass("fa fa-minus-circle")
			.on("click", removeListItem);

		listContainer.append(checkbox, label, removeIcon);

		return listContainer;
	}

	// Checkbox toggle event listener
	async function checkboxChange(e) {
		const isChecked = $(e.target)[0].checked;
		const id = $(e.target)[0].id;

		await updateData(`/api/ToDo/${id}`, isChecked);
		getList("/api/ToDo");
	}

	// Remove icon click event listener
	async function removeListItem(e) {
		const id = $(e.target).prev().prev()[0].id;

		await removeData(`/api/ToDo/${id}`);
		getList("/api/ToDo");
	}

	// If checklist is/isn't empty, show/remove message
	function isCheckListEmpty() {
		if (!checklist.children().length) {
			checklist.text("Nothing to do.");
		}
	}

	// If donelist is/isn't empty, remove/show hr
	function isDoneListEmpty() {
		if (!doneList.children().length) {
			$("hr").removeClass("d-block").addClass("d-none");
		} else {
			$("hr").removeClass("d-none").addClass("d-block");
        }
	}


	// Get all items on page load
	getList("/api/ToDo");

	// Add new item on form submit
	$("form").on("submit", async (e) => {
		e.preventDefault();

		const newItemText = $("#new-item").val();
		await postData("/api/ToDo", newItemText);
		getList("/api/ToDo");
		$("#new-item").val("");
	});
});