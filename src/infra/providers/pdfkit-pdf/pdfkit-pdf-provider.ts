import PDFDocument from "pdfkit";

import { PdfProvider } from "~/application/providers/pdf-provider";
import { Client } from "~/modules/client/domain/client";
import { OrderProduct } from "~/modules/order/domain/order-product";

export class PdfkitDdfProvider implements PdfProvider {
  private readonly doc: typeof PDFDocument;

  constructor() {
    this.doc = new PDFDocument({ size: "a4" });
  }

  public getDoc(): typeof PDFDocument {
    return this.doc;
  }

  public addOrderClient(client: Client): void {
    this.doc.fontSize(16).text("Cliente:").moveDown();

    this.doc
      .fontSize(12)
      .text(`Nome: ${client._name}`)
      .text(`Documento: ${client._document}`)
      .moveDown();
  }

  public setMainTitle(title: string): void {
    this.doc.fontSize(22).text(title, { align: "center" }).moveDown();
  }

  public setOrderTitle(orderFormattedTotal: string): void {
    this.doc
      .fontSize(18)
      .text(`Valor do pedido: ${orderFormattedTotal}`)
      .moveDown();
  }

  public addOrderProduct(orderProducts: Array<OrderProduct>): void {
    this.doc.fontSize(16).text("Produtos:").moveDown();

    orderProducts.forEach((product) => {
      this.doc
        .fontSize(12)
        .text(`Nome do produto: ${product._product._name}`)
        .text(`Quantidade no pedido: ${product._quantity}`)
        .text(`Valor unitario: $${product._product.getFormattedProductPrice}`)
        .text(
          `Valor total (unitario x quantidade): ${product.getFormattedOrderPrice}`
        )
        .moveDown();
    });
  }

  public end(): void {
    this.doc.end();
  }
}
