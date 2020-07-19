import { HitResult } from '@/messageResponse/messageResponseHit';

export class GoogleFactCheckFilter{
    constructor() {
        
    }

    filterFactCheckHits(hits: HitResult[]) : HitResult[] {
        return this.removeRepeatedHits(hits)

    }
    
    private removeRepeatedHits(hits: HitResult[]): HitResult[] {
        let filteredHits: HitResult[] = []

        for (let index = 0; index < hits.length && filteredHits.length < 3; index++) {
            let hit = hits[index];
            if (!this.isRepeated(filteredHits, hit)){
                filteredHits.push(hit)
            }
        }

        return filteredHits
    }
    
    private isRepeated(filteredHits: HitResult[], hit: HitResult) : boolean {
        for (let index = 0; index < filteredHits.length; index++) {
            let elem = filteredHits[index];
            if (elem.Checado == hit.Checado){
                return true
            }
        }
        return false
    }
}