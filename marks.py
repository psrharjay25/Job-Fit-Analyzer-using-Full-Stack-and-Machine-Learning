def calculate(answers):
    o = 0
    c = 0
    e = 0
    a = 0
    n = 0

    # for ques 1
    temp0 = int(answers[0])
    n += temp0

    # for ques 2
    temp1 = int(answers[1])
    c += temp1

    # for ques 3
    temp2 = int(answers[2])
    o += (6-temp2)

    # for ques 4
    temp3 = int(answers[3])
    e += temp3

    # for ques 5
    temp4 = int(answers[4])
    c += (6-temp4)

    # for ques 6
    temp5 = int(answers[5])
    a += (6-temp5)

    # for ques 7
    temp6 = int(answers[6])
    n += (6-temp6)

    # for ques 8
    temp7 = int(answers[7])
    e += temp7

    # for ques 9
    temp8 = int(answers[8])
    o += temp8

    # for ques 10
    temp9 = int(answers[9])
    a += temp9

    return o, c, e, a, n
