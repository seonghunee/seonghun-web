for (let i = 0; i <10; i++)
{
    console.log(i);
}

const users = ['A', 'B', 'c'];
for (const user of users)
{
    console.log(user);
}

const user = {
    name : 'Hwang',
    age : 24,
    isAdmin : true
}
for (const key in user)
{
    console.log(key)
    console.log(user[key])
}

isBool = false;
while (!isBool)
{
    isBool = confirm('Do you want quit');
}
console.log('Done!');