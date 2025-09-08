const form = document.getElementById("write-form");
const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  // 세계시간
  body.append('insertAt', new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await res.json();
    console.log(data);
    if (data === 200) {
      window.location.pathname = "/";
    }
  } catch (e) {
    console.log(e);
  }
};

form.addEventListener("submit", handleSubmitForm);
