function FormatData() {
    this.data = [];
    this.users = [];
    this.reactions = [];
    this.result = [];
}

FormatData.prototype.readFile = function(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target.readyState === 2) {
            this.result = JSON.parse(reader.result);
            // if (typeof this.onCompleted === 'function') {
            //     this.onCompleted(this.result);
            // }
        }
    };
    reader.readAsText(file);
} 

FormatData.prototype.onCompleted = function(data) {
    this.data = data;
}