const showSize = () => {
    const { files: fileElements } = document.getElementById('file')
    const files = Array.from(fileElements)
    debugger
}

const onload = () => {
    console.log('Loaded!')
}

window.onload = onload
window.showSize = showSize