export interface RepairTicket {
  ticketId: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  email?: string;
  phone?: string;

  estimatedFinishDate?: string;
  createdAt?: string;
  finishedAt?: string;
  customerNotified?: boolean;
}

export enum Pages {
  home = "home",
  itemManager = "itemManager",
  userProfile = "userProfile",
}
