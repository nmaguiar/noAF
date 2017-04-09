/*
 *  Copyright 2017 Nuno Aguiar <nuno@aguiar.name>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package noaf;

import java.io.FileNotFoundException;
import javax.script.ScriptException;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.ParseException;

public class CmdNoaf extends CmdBase {	
	/**
	 * Process options 
	 * 
	 * @param cmd The command line processed.
	 * @return true if help should be shown
	 */
	protected static boolean processOptions(CommandLine cmd) {
		boolean displayHelp = true;
		
		// non final options
		// -----------------
		
		if (cmd.hasOption("e")) {
			displayHelp = false;
			envString = cmd.getOptionValue("e");
		}
		
		// final options
		// -------------
		
		if (cmd.hasOption("f")) {
			displayHelp = false;
			try {
				noAF.execScript(cmd.getOptionValue("f"));
				return false;
			} catch (FileNotFoundException e) {
				System.err.println("Can't open: " + e.getMessage());
			} catch (ScriptException e) {
				System.err.println(e.getMessage());
			}
		}
		
		if (cmd.hasOption("s")) {
			try {
				noAF.exec(envString);
				return false;
			} catch (ScriptException e) {
				System.err.println(e.getMessage());
			}
		}
		
		return displayHelp;
	}
	
	public static void main(String args[]) {
		cmd = "CmdNoaf";
		boolean displayHelp = true;
		
		CommandLineParser parser = new DefaultParser();
		CommandLine cmdL = null;
		try {
			cmdL = parser.parse(getOptions(), args);
		} catch (ParseException e) {
			System.err.println("Can't parse the command line: " + e.getMessage());
			showHelp("noaf");
			System.exit(0);
		}
		
		displayHelp = processOptions(cmdL);
		
		if (displayHelp) showHelp("noaf");
	}
}

