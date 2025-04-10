// creating function to check and update ranks
function updateRank(userId, points) {
let newRank = null;

// defining points for each rank
if ( points >= 100 && points < 200) {
    newRank = 'Chunin';
} else if (points >= 200 && points < 500) {
    newRank = 'Jonin'
} else if (points < 1000) {
    newRank = 'Kage';
}

// updating rank in db if a new rank has been reached
if (newRank) {
    const rankQuery = 'UPDATE users SET rank = ? WHERE id = ?';
    database.query(rankQuery, [newRank, userId], (err, results) => {
        if(err) {
            console.error('Error updating rank:', err);
        } else {
            console.log('Rank updated to:', newRank);
        }
    });
}
}
// when completign a mission
const newTotalPoints = user.points + mission.points;
updateRank(user.id, newTotalPoints);

// adding points required for new rank and displaying progress

const pointsForNextRank = calculateNextRankPoints(userProfile.points);

// Send the user profile with the points needed for the next rank
res.json({
    username: userProfile.username, 
    rank: userProfile.rank,
    points: userProfile.points, 
    pointsForNextRank: pointsForNextRank
})


// example
function calculateNextRankPoints(points) {
    if (points < 100) {
        return 100 - points;  // Points needed for Genin → Chunin
    } else if (points < 200) {
        return 200 - points;  // Points needed for Chunin → Jonin
    } else if (points < 300) {
        return 300 - points;  // Points needed for Jonin → Kage
    } else {
        return 0;  // Already at max rank (Kage)
    }
}

