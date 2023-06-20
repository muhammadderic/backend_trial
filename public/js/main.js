// Function to handle form submission
const submitHandler = (e) => {
  e.preventDefault();

  // Get the form data
  const title = document.querySelector("input[name='title']").value;
  const description = document.querySelector("input[name='description']").value;

  // Create a new todo object
  const todo = {
    title, description
  };

  // Make a POST request to add the new todo
  fetch("/api/v1/todo/", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .then(data => {
      // Handle the response
      console.log(data);

      // window.location.reload();
    })
    .catch(error => console.error({ error: error.message }));
}

// Add event listener to the form submit event
document.querySelector(".form").addEventListener("submit", submitHandler);