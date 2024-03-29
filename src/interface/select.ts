export interface SelectInfo {
    Type: string, 
    Lang: string,
    table: string,
    column: object,
    allFlag?: string,
    where? : [object],
    sort? : [object],
}

export interface WhereInfo {
    column: string,
    operator: string,
    condition: string
}