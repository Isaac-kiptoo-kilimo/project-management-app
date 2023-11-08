"use strict";
class TaskModal {
    constructor() {
        this.modal = document.getElementById("taskModal");
        this.closeModal = document.getElementById("closeModal");
        this.addButton = document.querySelector("addtask");
        this.taskForm = document.getElementById("taskForm");
        this.closeModal.addEventListener("click", this.closeModalHandler.bind(this));
        this.addButton.addEventListener("click", this.openModalHandler.bind(this));
        window.addEventListener("click", this.closeModalOnOutsideClick.bind(this));
        this.taskForm.addEventListener("submit", this.formSubmitHandler.bind(this));
    }
    openModalHandler() {
        this.modal.style.display = "block";
    }
    closeModalHandler() {
        this.modal.style.display = "none";
    }
    closeModalOnOutsideClick(event) {
        if (event.target === this.modal) {
            this.modal.style.display = "none";
        }
    }
    formSubmitHandler(event) {
        event.preventDefault();
        const taskName = this.taskForm.elements.namedItem("taskName").value;
        const assignedTo = this.taskForm.elements.namedItem("assignedTo").value;
        const description = this.taskForm.elements.namedItem("description").value;
        const completionDate = this.taskForm.elements.namedItem("completionDate").value;
        console.log(`Task Name: ${taskName}`);
        console.log(`Assigned To: ${assignedTo}`);
        console.log(`Description: ${description}`);
        console.log(`Completion Date: ${completionDate}`);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new TaskModal();
});
