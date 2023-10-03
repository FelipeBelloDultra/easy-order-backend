import { container } from "tsyringe";

import { PdfProvider } from "~/application/providers/pdf-provider";
import { PdfkitDdfProvider } from "./pdfkit-pdf-provider";

container.register<PdfProvider>("PdfProvider", PdfkitDdfProvider);
