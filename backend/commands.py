import click
from flask.cli import with_appcontext
from .database.model import db
@click.command(name = 'create_tables')
@with_appcontext
def create_table():
    db.drop_all()
    db.create_all()