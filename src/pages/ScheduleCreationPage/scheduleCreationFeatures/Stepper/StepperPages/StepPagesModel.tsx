export interface Place {
    name: string;
    address: string;
  }
  
  export interface TravelPlan {
    required_place: Place[];
    destination: string;
    duration: string;
    companion: string;
    style: string;
    schedule_count: string;
    budget: number; // 단위: 만원
    extra?: string;
  }