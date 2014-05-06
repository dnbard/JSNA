define([
    'underscore',
    'images',
    'main/strings'
], function(_, images, strings){
    function AnimationController(animationModel){
        _.extend(this, animationModel);

        this.lastFrameUpdate = new Date();
        this.currentIndex = this.startIndex;
    }

    function increment(current, min, max){
        current += 1;
        if (current > max){
            current = min;
        }

        return current;
    }

    AnimationController.prototype.update = function(time){
        if (time - this.lastFrameUpdate <= this.timeoutBetweenFrames){
            return;
        } 

        this.currentIndex = increment(this.currentIndex, this.startIndex, this.finishIndex);
        this.image = images.get(strings.format(this.spriteName, this.currentIndex));
        this.lastFrameUpdate = time;
    }

    return AnimationController;
});

/*

{
    name: 'animation{0}', STRING TEMPLATE
    startIndex: 0,
    finishIndex: 3,
    timeoutBetweenFrames: 150,
    endless: true
}


*/