window.jsPDF = window.jspdf.jsPDF;
document.querySelector("#btn-download-cv").addEventListener("click", () => {
  html2canvas(document.querySelector("#capture")).then((canvas) => {
    document.body.append(canvas);
    const data = canvas.toDataURL("image/jpeg");
    const doc = new jsPDF();
    doc.addImage(data, "JPEG", 15, 40, 180, 180);
    // doc.save("cv.pdf");
  });
});
