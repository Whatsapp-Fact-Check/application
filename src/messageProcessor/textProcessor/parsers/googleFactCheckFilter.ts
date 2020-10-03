import { CheckedFact } from '../../../messageResponse/MessageResponseCheckedFacts';

export class GoogleFactCheckFilter{
    constructor() {
        
    }

    filterFactCheckHits(checkedFacts: CheckedFact[]) : CheckedFact[] {
        return this.removeRepeated(checkedFacts)
    }
    
    private removeRepeated(checkedFacts: CheckedFact[]): CheckedFact[] {
        let filteredCheckedFacts: CheckedFact[] = []

        for (let index = 0; index < checkedFacts.length && filteredCheckedFacts.length < 3; index++) {
            let checkedFact = checkedFacts[index];
            if (!this.isRepeated(filteredCheckedFacts, checkedFact)){
                filteredCheckedFacts.push(checkedFact)
            }
        }

        return filteredCheckedFacts
    }
    
    private isRepeated(filteredCheckedFacts: CheckedFact[], checkedFact: CheckedFact) : boolean {
        for (let index = 0; index < filteredCheckedFacts.length; index++) {
            let elem = filteredCheckedFacts[index];
            if (elem.Checado == checkedFact.Checado){
                return true
            }
        }
        return false
    }
}