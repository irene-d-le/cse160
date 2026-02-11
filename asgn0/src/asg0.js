// DrawTriangle.js (c) 2012 matsuda
// asg0.js Irene Le
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a black background instead of blue rectangle
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create vector v1 
  var v1 = new Vector3([2.25, 2.25, 0]);
  
  // Draw the vector
  drawVector(v1, "red");
}


function handleDrawEvent() {
  // Get canvas and clear it
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Read v1 values from input boxes
  var v1x = parseFloat(document.getElementById('v1x').value);
  var v1y = parseFloat(document.getElementById('v1y').value);
  var v1 = new Vector3([v1x, v1y, 0]);
  
  // Read v2 values from input boxes 
  var v2x = parseFloat(document.getElementById('v2x').value);
  var v2y = parseFloat(document.getElementById('v2y').value);
  var v2 = new Vector3([v2x, v2y, 0]);
  
  // Draw both vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");  
}

// Handle operation button click
function handleDrawOperationEvent() {
  // Get canvas and clear it
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Read v1 and v2 values
  var v1x = parseFloat(document.getElementById('v1x').value);
  var v1y = parseFloat(document.getElementById('v1y').value);
  var v1 = new Vector3([v1x, v1y, 0]);
  
  var v2x = parseFloat(document.getElementById('v2x').value);
  var v2y = parseFloat(document.getElementById('v2y').value);
  var v2 = new Vector3([v2x, v2y, 0]);
  
  // Draw original vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
  
  // Read operation and scalar
  var operation = document.getElementById('operation').value;
  var scalar = parseFloat(document.getElementById('scalar').value);
  
  // Operations
  if (operation === 'add') {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.add(v2);
    drawVector(v3, "green");
  } 
  else if (operation === 'sub') {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.sub(v2);
    drawVector(v3, "green");
  }
  else if (operation === 'mul') {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v3.mul(scalar);
    v4.mul(scalar);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (operation === 'div') {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v3.div(scalar);
    v4.div(scalar);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (operation === 'magnitude') {
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    console.log("Magnitude v1:", mag1);
    console.log("Magnitude v2:", mag2);
  }
  else if (operation === 'normalize') {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v3.normalize();
    v4.normalize();
    drawVector(v3, "green");
    drawVector(v4, "green");//
  }
  else if (operation === 'angleBetween') {
    var angle = angleBetween(v1, v2);
    console.log("Angle between v1 and v2:", angle, "degrees");
  }
  else if (operation === 'area') {  // ADD THIS ENTIRE BLOCK
    var area = areaTriangle(v1, v2);
    console.log("Area of triangle:", area);
  }
}

// Calculate angle between two vectors
function angleBetween(v1, v2) {
  var dotProduct = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();
  var cosAngle = dotProduct / (mag1 * mag2);
  var angleRadians = Math.acos(cosAngle);
  var angleDegrees = angleRadians * (180 / Math.PI);
  return angleDegrees;
}
// Calculate area of triangle given two vectors
function areaTriangle(v1, v2) {
  var crossProduct = Vector3.cross(v1, v2);
  var parallelogramArea = crossProduct.magnitude();
  var triangleArea = parallelogramArea / 2;
  return triangleArea;
}

//Function to draw a vector
function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  
  // Center of canvas (200, 200)
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  
  // Scale vector by 20 and account for canvas coordinates
  var endX = centerX + (v.elements[0] * 20);
  var endY = centerY - (v.elements[1] * 20);  // Subtract because Y goes down
  
  // Draw the line
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}