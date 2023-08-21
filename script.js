const sortableList = document.getElementById("sortable-list");
let draggingElement;

sortableList.addEventListener("dragstart", (e) => {
  draggingElement = e.target;
  e.dataTransfer.setData("text/plain", "");
});

sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(sortableList, e.clientY);
  if (afterElement == null) {
    sortableList.appendChild(draggingElement);
  } else {
    sortableList.insertBefore(draggingElement, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, element) => {
      const box = element.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: element };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

sortableList.addEventListener("dragend", () => {
  draggingElement = null;
});
