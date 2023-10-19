class Plan {
   name: string;
   created: number;
   updated: number;

   constructor(name: string, created: number, updated: number) {
        this.name = name;
        this.created = created;
        this.updated = updated;
   }
}

export default Plan;