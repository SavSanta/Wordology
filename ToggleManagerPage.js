class ToggleManagerPage
{
	constructor(name, config)
	{
		if (config.onFirstOn)
			this.onFirstOn = config.onFirstOn;
		if (config.onToggleOn)
			this.onToggleOn = config.onToggleOn;
		if (config.onToggleOff)
			this.onToggleOff = config.onToggleOff;
		if (config.onLoggedOut)
			this.onLoggedOut = config.onLoggedOut;
		if (config.onLoggedOutPress)
			this.onLoggedOutPress = config.onLoggedOutPress;

		this.readyMessageSender = new MessageSender(name + "Ready");
		this.doneRunningMessageSender = new MessageSender(name + "DoneRunning");

		new MessageSlot(name + "ToggleFirstOn",
			async (message, sender) =>
			{
				await this.onFirstOn();
				this.doneRunningMessageSender.sendToRuntime({});
			}
		);

		new MessageSlot(name + "ToggleOn",
			async (message, sender) =>
			{
				await this.onToggleOn();
				this.doneRunningMessageSender.sendToRuntime({});
			}
		);

		new MessageSlot(name + "ToggleOff",
			(message, sender) => this.onToggleOff()
		);

		new MessageSlot(name + "LoggedOut",
			(message, sender) => this.onLoggedOut()
		);

		new MessageSlot(name + "LoggedOutPress",
			(message, sender) => this.onLoggedOutPress()
		);

		this.readyMessageSender.sendToRuntime();
	}

	onFirstOn()	{}
	onToggleOn() {}
	onToggleOff() {}
	onLoggedOut() {}
	onLoggedOutPress() {}
}
