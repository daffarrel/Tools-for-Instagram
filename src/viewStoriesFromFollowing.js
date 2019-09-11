
async function viewStoriesFromFollowing(ig, username, iterations = null) {
    
    if(iterations != null) {
        await getFollowing(ig, username, iterations);
        
    } else {
        await getFollowing(ig, username);
        
    }
    let followers = await readFollowing(ig, username);
    let totalViews = 0;
    
    for(let i = 0; i < followers.length; i++) {
        totalViews += await viewStoriesFromId(ig, followers[i].pk);
        process.stdout.write("\r\x1b[K");
        process.stdout.write("Follower:"+i+"/"+followers.length+" Total views: " + totalViews + " ");
        if(i % 100 == 0 && i != 0) {
            let minutes = 1;
            process.stdout.write("\r\x1b[K");
            process.stdout.write("Watched " + i + " users, "+  totalViews + " stories viewed, waiting "+ minutes +" Minutes.. ");
            await sleep(60 * minutes, false);
        }
        
    }
    console.log(("\nStories from " + username + " following completed").green);
    return totalViews;
}

module.exports = viewStoriesFromFollowing;