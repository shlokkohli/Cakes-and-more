# Home page cake fetching Architecture

~~1. First know who the user is~~ **_(Not required since at the home screen can be visited by unauthenciated users as well)_**

2. search the cakes table to find any random cakes (random cakes algo below)
3. in the cakes db, it will contain all cakes names, the image of the cake, the title, the shortDescirption and other info that i might need to show
4. to get the image for that cake, we need to make a join to the CakeImage table, this contains the Cloudinary Image ID for that cake image
5. since the user is at the home screen, we not need to show the user the cake category (so no need to make a join to the cakes category table)
6. we want the user to see new cakes daily, we cannot show different cakes on every refesh, if we do this, then we wont be able to cache cakes, we would have to make a db call everytime, and fetch random cakes from there

# Shuffling the items is the key idea here

- If there were 100 cakes, we took some random 20 cakes in page 1
- Now when shuffle happens again on page 2, we might show the same cake we used in page 1 again
- So to fix this issue, we use **_Fisher Yates Shuffle_**

<details>
<summary>Fisher Yates Shuffle</summary>

1. We starting by getting first the total number of entries in the db
2. suppose they are 10
3. we iterate the array from the end
4. initially the last_index is at the last element, we take the last_index and find any random element between 1 and the last_index (which is 10 here)
5. suppose we find random number which is 5, we then swap the last_index with 5
6. now we cotinue iterating, we decrement the last_index, and it now becomes 9, we again find a random number between 1 and last_index (which is 9 here)
7. suppose we find 3, we then swap the last_index with 3 now
8. we keep on doing this until all values are shuffuled
9. now suppose all values are shuffuled, we take these shuffled values, and break them down into slices (for paginated data)
10. so like we give values 1-4 for page 1, values 5-8 for page 2, and so on.
11. This makes sure that the values are always find shuffled from the db

</details>

- Wait, the Fisher yates shuffle algorithm is not going to work for our case, where everything is deployed in a serverless environment, because we cannot persist the shuffled list.
- We need to use a Deterministic Hashed-Based Shuffling here.

<details>
<summary>Deterministic Hashed-Based Shuffling (Seed Based Ordering)</summary>

1. Suppose there are 10 rows for the cakes table in the db, we need a way to randomly shuffle and make sure it works with paginated output as well.
2. Before understanding this, first understand how random results are generated from the computer itself, whenever we write Math.random(), the computer is never generating a random value. What it always generates is a deterministic output.
3. Deterministic means the output looks like random, but it is strictly generated through rules and mathimatical conditions.
4. Suppose take the exmaple of Math.random(), writing it always generates a random output because it takes a different input input each time, that might be time in nano seconds, if we feed it the exact same time, it is **_ALWAYS_** going to give the same output (Math.random() does not actually used md5 algo, it uses some other method to calculate random value, but it is also deterministic only).
5. In algorithms like these, there is a seed value used, that seed values is a sort of mathimatical constant being feed into that formula, is we change that seed value, the output generated will also be differet.
6. In our case where we want to a generate randomly shuffled paginated data, it will work like this :
7. We create a helper function that takes the seed value, offset, and limit as input.
8. In our case, since the cakes data need to be shuffled everyday at midnight and also when a new cake is inserted in a db, the seed value will be current date (since changing this will change the output) and we need a method to know if a new cake has been inserted or not, for that we will keep a count variable.
9. For maintaining the count of whether a new cake has been added or not, we create a new schema, `Model ShuffleConfig` that will contain an id (it will always be 1, will explain later why always 1 or any other fixed number) and count variable that only increments when a new cake has been added.
10. The seed value now looks like this, `const seed = count + '-' + 'date'`. This count is coming from that one and only single row entry that is in the shuffleconfig table. Everytime a new cake is inserted in the db, the count gets incremented by 1 (now we know why we only used one single entry in the table and why the id was 1, thought it can be any numberm, just remember, only one entry in that table, so we can just pick that entry and inrement its count).
11. So in that helper function, we send this seed value, and write this sql query (will explain this sql query below): `SELECT id FROM "Cake" ORDER BY md5(id::text || ${seed}) LIMIT ${pageSize} OFFSET ${offset}`
12. Suppose there were 10 entries in the whole Cake table, we apply md5 algo in that whole table with the seed value being the cake id itself and the incoming pre-calculated seed value (we need both because if we just use the pre-calculated seed value in md5 algo, it will give the same output always, for id 1, in the md5 algo, we send the input as date+count, so on all entries it gives the same output, but for a different id + the pre-calculated seed value, it gives different output).
13. Suppose a random 32 character hash value is generated from that algo, we use ORDER BY on the given output values, so it sorts them based on the alphabetical order, and now, a random value is generated for each page.
14. This was the Seed based deterministic approach to shuffle all the cakes.

</details>

## Step by Step Architecture

1. First count the total number of entries in the whole "Cake" db.
2. Create the seed value using count from the ShuffleConfig table and the current date and pass that seed value to the above deterministic hashed based function.
3. Run both of these in parallel simultaneously.
4. Also fetch the pageNumber from the url, and if page number is not provided, default back to 1.
5. Set a default page size of 20 or 30 in the backend.
6. Add a validation for page number, only accept page numbers 1 to N, ignore page number 0 or negative numbers, and if page number is not send, set it as 1.
7. Running step 2 gives the list of id's of the cakes that should be shown on that page for which the api call is made.
8. Use those id's to fetch the `Cake.title`, `Cake.shortDescription`, `Cake.price`. Also make a join to the `CakeImage Table` to find the right image to show, based on the label for that image.
9. From those cake id's, also fetch those cake's category from the `CakeCakeType Table`.
10. All data to the frontend will be send in 2 types, 1st will be: Cakes data which will be an array that will include all cakes details that we just fetches, second will be extra required things, like `page, totalItems: totalIds, totalPages`.
11. Repeate the above steps on every new page number call.
12. Also remember to add rate limiting to this page, even though it is a public page and anyone with or without a session can access this, still there should be a limit to this page per ip, lets take that 60.
