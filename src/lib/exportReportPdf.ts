// import domtoimage from "dom-to-image";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";

export const exportTabAsPDF = async (
  elementId: string,
  filename: string = "report.pdf",
): Promise<void> => {
  const root = document.getElementById(elementId);
  if (!root) {
    console.warn(`[exportTabAsPDF] Element #${elementId} not found.`);
    return;
  }

  const clone = root.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.top = "0";
  clone.style.left = "-10000px"; 
  clone.style.zIndex = "-1";
  clone.style.pointerEvents = "none";
  document.body.appendChild(clone);

  clone.querySelectorAll<HTMLElement>(".no-export").forEach((el) => {
    el.style.display = "none";
  });

  clone.querySelectorAll<HTMLElement>(".pdf-only").forEach((el) => {
    el.style.display = "block";
  });


  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297 mm
    const margin = 8; // mm
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;

    const blocks = Array.from(
      root.querySelectorAll<HTMLElement>(".export-block"),
    );
    const pages: HTMLElement[] = blocks.length ? blocks : [clone];

    let isFirstPage = true;

    for (const pageEl of pages) {
      const dataUrl = await domtoimage.toPng(pageEl, { scale: 2 } as any);

      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = dataUrl;
      });

      const pxPerMm = 3.7795275591;
      const wMm = img.width / pxPerMm / 2;
      const hMm = img.height / pxPerMm / 2;

      const scale = Math.min(maxW / wMm, maxH / hMm, 1);
      const drawW = wMm * scale;
      const drawH = hMm * scale;

      const x = margin + (maxW - drawW) / 2;
      const y = margin;

      if (!isFirstPage) pdf.addPage();
      isFirstPage = false;

      pdf.addImage(dataUrl, "PNG", x, y, drawW, drawH);
    }

    pdf.save(filename);
  } catch (err) {
    console.error("[exportTabAsPDF] Export failed:", err);
  } finally {
     document.body.removeChild(clone); 
  }
};
