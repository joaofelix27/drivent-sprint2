export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type CreateTicket = { 
  ticketTypeId: number 
}

export type CreatePayment = {
    ticketId: number,
    cardData: {
      issuer: string,
      number: number,
      name: string,
      expirationDate: Date,
      cvv: number
    }
  }
export type TicketWithEnrollment = {
    id: number;
    ticketTypeId: number;
    enrollmentId: number;
    status: "PAID" | "RESERVED";
    Enrollment: {
      id: number;
      name: string;
      cpf: string;
      birthday: Date;
      phone: string;
      userId: number;
      createdAt: Date;
      updatedAt: Date;
  }
    createdAt: Date;
    updatedAt: Date;
}
