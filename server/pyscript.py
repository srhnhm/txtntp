#!/usr/bin/python
import os
import cgi
import cgitb
import requests

##############################################

username = 'HARD.CODED.EMAIL@gmail.com'
password = 'HARD.CODED.PASSWORD'



# Gmail //////////////////////////////////////////////////

def sendEmail(sender, password, recipient, subject, body):
	import smtplib 
	SMTP_SERVER = 'smtp.gmail.com'
	SMTP_PORT = 587

	body = "" + body + ""
	 
	headers = ["From: " + sender,
	           "Subject: " + subject,
	           "To: " + recipient,
	           "MIME-Version: 1.0",
	           "Content-Type: text/html"]
	
	headers = "\r\n".join(headers)
	 
	session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT) 
	session.ehlo()
	session.starttls()
	session.ehlo
	session.login(sender, password)
	session.sendmail(sender, recipient, headers + "\r\n\r\n" + body)
	session.quit()


# Docs //////////////////////////////////////////////////

def createDocument(doctitle, doccontents):
	f = open(filepath+'temp.txt', 'w')
	f.write(doccontents)
	f.close()

	import os.path
	import gdata.data
	import gdata.acl.data
	import gdata.docs.client
	import gdata.docs.data
	import gdata.sample_util


	client = gdata.docs.client.DocsClient(source="testext")
	client.http_client.debug = False
	try:
		client.ClientLogin(username, password, client.source)
		doc = gdata.docs.data.Resource(type='document', title=doctitle)
		path = filepath+'temp.txt'
		media = gdata.data.MediaSource()
		media.SetFileHandle(path, 'text/html')
		doc = client.CreateResource(doc, media=media)
		return doc.resource_id.text[9:]
	except gdata.client.BadAuthentication:
		return 'Invalid user credentials given.'
	except gdata.client.Error:
		return 'Login Error'

##############################################

try:
    params = cgi.FieldStorage()
    action = params.getvalue('action')
except:
	pass


if 'REQUEST_METHOD' in os.environ : # IS a webpage
	filepath = "server/data/"
	print "Content-Type: text/plain;charset=utf-8\n"
else :
    filepath = "data/"
    print "Content-Type: text/plain;charset=utf-8\n"

if action == None:
	action = 'Error'

elif action == 'mail':
	recipient = params.getvalue('recipient')
	subject = params.getvalue('subject')
	body = params.getvalue('body')
	confirmation = sendEmail(username, password, recipient, subject, body)

elif action == 'doc':
	doctitle = params.getvalue('title')
	doccontents = params.getvalue('body')
	response = createDocument(doctitle, doccontents)
	print response