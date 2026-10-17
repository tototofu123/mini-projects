import turtle
turtle.width(4)
turtle.speed(10)
fillcolor='black'
turtle.fillcolor(fillcolor)

print('Welcome to the Python Sketchbook!')
option=''

while option!='q':
    print()
    print('Please choose one of the following options:')
    print() 
    print('m - Move the turtle')
    print('t - Rotate the turtle')   
    print('l - Draw a line')
    print('r - Draw a rectangle')   
    print('c - Draw a circle')
    print('p - Change the pen colour of the turtle') 
    print('f - Change the fill colour of the turtle')
    print('q - Quit the program')
    
    option=input('please input')
    if option =='m':
        x=input('please enter the x value:')
        x=int(x)
        y=input('please enter the y value:')
        y=int(y)
        turtle.up()
        turtle.goto(x,y)
        turtle.down()

    if option =='t':
        print()
        rotation=input('please enter the angle of rotation:')
        rotation=int(rotation)
        turtle.left(rotation)

    if option =='l':
        x=input('please enter the x value:')
        x=int(x)
        y=input('please enter the y value:')
        y=int(y)
        turtle.goto(x,y)
        

    if option =='r':
        width=input('please enter the width value:')
        width=int(width)
        height=input('please enter the height value:')
        height=int(height)
        rep=0
        while rep<2:
            turtle.forward(width)
            turtle.left(90)
            turtle.forward(height)
            turtle.left(90)
            rep=rep+1

    if option=='c':
        radius =input('please enter the radius of the circle:')
        radius=int(radius)
        turtle.circle(radius)

    if option=='p':
        color=input('please enter a colour name for the pen colour:')
        turtle.pencolor(color)
    
    if option=='f':
        fillcolor=input('please enter a colour name for the fill colour:')
        turtle.fillcolor(fillcolor)


    
    
    

