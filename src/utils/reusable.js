export const snapShotLooper = (snapShot) => {
	const dataArray = [];

	snapShot.forEach((childSnapShot) => {
		dataArray.push({ projectId: childSnapShot.key, ...childSnapShot.val() });
	});

	return dataArray.reverse();
};
