// updating points and rank function
// named export
 const updatePointsAndRank = (req, res) => {
     console.log('Works just fine');
    const userId = req.session.userId;  // getting user ID from session
    const { points } = req.body;  // getting points from the request body

    if (!userId) {
        return res.status(401).send('Unauthorized');  // ensuring user is logged in
    }

    // calling the userModel to update points and rank
    userModel.updatePointsAndRank(userId, points)
        .then(result => {
            res.status(200).send('Points and rank updated successfully');  // sending success message
        })
        .catch(err => res.status(500).send('Server error'));  // handling errors
}
module.exports = {updatePointsAndRank};