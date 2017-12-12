document.getElementById("text_button").onclick = () => {
    const textInput = document.getElementById("text_input");
    console.log(textInput.value);
    textInput.value = "";
};
