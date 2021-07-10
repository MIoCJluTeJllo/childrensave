function drawText(text, x, y, style, stroke, color='black') {
    ctx.font = style;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    if (stroke){
        ctx.strokeText(text, x, y);
    }
    else {
        ctx.fillText(text, x, y);
    }
}

function drawText(text, x, y, style, stroke, color='black') {
    ctx.font = style;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    if (stroke){
        ctx.strokeText(text, x, y);
    }
    else {
        ctx.fillText(text, x, y);
    }
}