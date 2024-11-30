export interface Point {
    lat: number;
    lng: number;
}

export interface LuggageDTO {
    startPoint: Point;
    endPoint: Point;
    email: string;  // name -> email로 변경
}
