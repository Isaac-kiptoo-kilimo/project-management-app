class TaskModal {
    private modal: HTMLElement;
    private closeModal: HTMLElement;
    private addButton: HTMLElement;
    private taskForm: HTMLFormElement;

    constructor() {
        this.modal = document.getElementById("taskModal") as HTMLElement;
        this.closeModal = document.getElementById("closeModal") as HTMLElement;
        this.addButton = document.querySelector("button") as HTMLElement;
        this.taskForm = document.getElementById("taskForm") as HTMLFormElement;

        this.closeModal.addEventListener("click", this.closeModalHandler.bind(this));
        this.addButton.addEventListener("click", this.openModalHandler.bind(this));
        window.addEventListener("click", this.closeModalOnOutsideClick.bind(this));
        this.taskForm.addEventListener("submit", this.formSubmitHandler.bind(this));
    }

    private openModalHandler() {
        this.modal.style.display = "block";
    }

    private closeModalHandler() {
        this.modal.style display = "none";
    }

    private closeModalOnOutsideClick(event: MouseEvent) {
        if (event.target === this.modal) {
            this.modal.style.display = "none";
        }
    }

    private formSubmitHandler(event: Event) {
        event.preventDefault();
        const taskName = (this.taskForm.elements.namedItem("taskName") as HTMLInputElement).value;
        const assignedTo = (this.taskForm.elements.namedItem("assignedTo") as HTMLInputElement).value;
        const description = (this.taskForm.elements.namedItem("description") as HTMLTextAreaElement).value;
        const completionDate = (this.taskForm.elements.namedItem("completionDate") as HTMLInputElement).value;
        console.log(`Task Name: ${taskName}`);
        console.log(`Assigned To: ${assignedTo}`);
        console.log(`Description: ${description}`);
        console.log(`Completion Date: ${completionDate}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new TaskModal();
});
