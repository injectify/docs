# Creating a MongoDB database
!!! tip
    For simplicity and compatibility, we recommend using [mLab](https://mlab.com) with the Free plan. If you intend to have a lot of traffic you can also setup a [dedicated database](#option-2-setting-up-a-dedicated-mongodb-database)

## **[Option 1]** Creating an mLab database
1. Head over to [mLab and create an account](https://mlab.com/signup/)

!!! warning ""
    Make sure to **verify your email**, if you don't then it won't allow you to create a database

2. Click on <kbd>Create new</kbd> in the upper right corner
3. Select <kbd>Sandbox</kbd> and then click <kbd>Continue</kbd><br><br>
![New deployment](https://i.imgur.com/R5F6sd1.png)
4. Select your preferred region and click <kbd>Continue</kbd>
5. Enter `injectify` as the database name, click <kbd>Continue</kbd> and then <kbd>Submit order</kbd>
6. Click on your new database and select <kbd>Users</kbd> and then <kbd>Add database user</kbd><br><br>
![Add database user](https://i.imgur.com/iOB8B4A.png)
7. Choose a username and password and click <kbd>Create</kbd> (make sure `read-only` is left unchecked)

---

## **[Option 2]** Setting up a dedicated MongoDB database
Todo