~~1. First know who the user is~~ **_(Not required since at the home screen can be visited by unauthenciated users as well)_**

2. search the cakes table to find any random cakes, and show them
3. in the cakes db, it will contain all cakes names, the image of the cake, the title, the shortDescirption, all these that i need to show
4. to get the image for that cake, we need to make a join to the other table (CakeImage table), this contains the url for that cake image (fetched from cloudinary)
5. since the user is at the home screen, we not need to show the user the cake category (so no need to make a join to the cakes category table)
6. we want the user to see new cakes daily, we cannot show different cakes on every refesh, if we do this, then we wont be able to cache cakes, we would have to make a db call everytime, and fetch random cakes from there

# Shuffling the items is the key idea here

- If there were 100 cakes, we took some random 20 cakes in page 1
- Now when suffule happens again on page 2, we might show the same cake we used in page 1 again
- So to fix this issue, we use **_Fisher Yates Shuffle_**

## Fisher Yates Shuffle

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
