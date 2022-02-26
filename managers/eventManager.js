module.exports = eventManager = (msg) => {
    const commands = {
    }

    try {
        commands[msg.eventPayload.command]();
    } catch (e) {

    }
}