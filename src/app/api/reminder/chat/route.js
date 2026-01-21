/**
 * Reminder Agent - Chat API
 * 
 * Handles text-based urgent alerts to riders.
 * 
 * Environment Variables:
 * - ELEVENLABS_API_KEY: Your ElevenLabs API key
 * - REMINDER_TEXT_AGENT_ID: ElevenLabs text agent ID for reminders
 */

export async function POST(req) {
  try {
    const { message, sessionId, outletId } = await req.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // TODO: Connect to messaging service for urgent alerts
    
    return Response.json({
      response: `⚡ URGENT ALERT: ${message}. Please respond if you can report to the outlet immediately.`,
      sessionId: sessionId || `reminder_session_${Date.now()}`,
      outlet: outletId,
    });

  } catch (error) {
    console.error('Reminder chat error:', error);
    return Response.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
