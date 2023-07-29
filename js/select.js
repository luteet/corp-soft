document.querySelectorAll('.popup select').forEach(select => {
	new SlimSelect({
		select: select,
		settings: {
			showSearch: false,
		}
	})
})