class DateCheck {
  constructor() {
    this.currentDate = "";
    this.newDate = false;
  }
  async checkNewDay() {
    let newDate = new Date();
    newDate = newDate.getDate();
    if (newDate === 30 && newMonth === false) {
      newMonth = true;
      console.log("getting new ids");
      //   await startScrape();
      return "getting new ids";
    }
    if (newDate !== this.currentDate) {
      console.log("its a new day");
      this.currentDate = newDate;
      //   await removeID();
      return "its a new day";
    }
    return "nothin new";
  }
}

const dateCheck = new DateCheck();

dateCheck.checkNewDay();
dateCheck.checkNewDay();
