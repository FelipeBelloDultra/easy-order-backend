import PDFDocument from "pdfkit";

import { Client } from "~/modules/client/domain/client";
import { OrderProduct } from "~/modules/order/domain/order-product";

export interface PdfProvider {
  getDoc: () => typeof PDFDocument;
  addOrderProduct: (orderProducts: Array<OrderProduct>) => void;
  addOrderClient: (client: Client) => void;
  setOrderTitle: (orderFormattedTotal: string) => void;
  setMainTitle: (title: string) => void;
  end: () => void;
}
